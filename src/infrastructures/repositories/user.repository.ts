import { Injectable } from '@angular/core';
import { User } from '../../app/modals/user';

const TABLE_USER = 'users';

@Injectable()
export class UserRepository {
    add(profile: gapi.auth2.BasicProfile){
        const users = this.getAll();

        let foundIndex = -1;
        for (let i = 0; i < users.length; i++){
            if (users[i].Id === profile.getId()){
                foundIndex = i;
                break;
            }
        }
        if (foundIndex >= 0) {
            users.splice(foundIndex, 1);
        }

        users.push(User.fromBasicProfile(profile));
        this.save(users);
    }

    getAll(): User[]{
        const data = localStorage.getItem(TABLE_USER);
        if (data) {
            return  (JSON.parse(data)) as User[];
        }
        else {
            return [];
        }
    }

    save(users: User[]){
        localStorage.setItem(TABLE_USER, JSON.stringify(users));
    }

}
