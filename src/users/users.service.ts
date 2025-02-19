import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { firestore } from '../config/firebase.config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private usersCollection = firestore.collection('users');


    async createUser(dto: CreateUserDto) {

        const emailExists = await this.usersCollection.where('email', '==', dto.email).limit(1).get();
        if (!emailExists.empty) {
            throw new ConflictException('Email already in use');
        }

        // Add new user
        const newUserRef = this.usersCollection.doc();
        const newUser = { id: newUserRef.id, ...dto };
        await newUserRef.set(newUser);

        return newUser;
    }

    async getUsers(limit = 10, cursor?: string) {
        let query = this.usersCollection.orderBy('name').limit(limit);

        // Using cursor for pagination
        if (cursor) {
            const lastUser = await this.usersCollection.doc(cursor).get();
            if (!lastUser.exists) throw new NotFoundException('Cursor not found');
            query = query.startAfter(lastUser);
        }

        const snapshot = await query.get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getUserById(id: string) {
        const doc = await this.usersCollection.doc(id).get();
        if (!doc.exists) throw new NotFoundException('User not found');
        return doc.data();
    }

    async updateUser(id: string, dto: UpdateUserDto) {
        const userRef = this.usersCollection.doc(id);
        const user = await userRef.get();

        if (!user.exists) throw new NotFoundException('User not found');

        await userRef.update(dto as any);
        return { id, ...dto };
    }
}
