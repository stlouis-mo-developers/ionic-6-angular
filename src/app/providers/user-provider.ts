import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage-service';
import { Authentication } from '../models/authentication';
import { Observable, from, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserProvider {
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  _users: Array<any> = [{
    id: '1',
    username: 'Johhny Rocket',
    emailaddress: "",
    done: false,
    date: new Date()
  }, {
    id: '2',
    username: 'Jekyll Hyde',
    emailaddress: "",
    done: false,
    date: new Date()
  }, {
    id: '3',
    username: 'Storm Trooper',
    emailaddress: "",
    done: false,
    date: new Date()
  }, {
    id: '4',
    username: 'Lennox Lewis',
    emailaddress: "",
    done: false,
    date: new Date()
  }];


  constructor(
    public storage: StorageService
  ) { }

  hasUser(user: any): boolean {
    return (this._users.indexOf(user) > -1);
  }

  addUser(user: any): void {
    this._users.push(user);
  }

  updateUser(user: any): void {
    /*
    const index = this._users.indexOf(user);
    if (index > -1) {
      this._users.splice(index, 1);
    }
    */
    for (let i = 0; i < this._users.length; i++) {
      if (user.id === this._users[i].id) {
        this._users[i] = user;
        break;
      }
    }
  }

  removeUser(user: any): void {
    /*
    const index = this._users.indexOf(user);
    if (index > -1) {
      this._users.splice(index, 1);
    }
    */
    for (let i = 0; i < this._users.length; i++) {
      if (user.id === this._users[i].id) {
        const sliced = this._users.splice(i, 1);
        break;
      }
    }
  }

  getUsers(): Array<any> {
    return this._users;
  }

  login(login: Authentication): Promise<any> {
    const username = login.username;
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      //return window.dispatchEvent(new CustomEvent('user:login'));
    });
  }

  loginObservable(login: Authentication): Observable<any> {
    console.log({ login: login });
    let authenticated = false;
    if ( (login.username && login.username.indexOf('@') > -1) && 
          (login.emailaddress && login.emailaddress.length > 6) ) {
      const username = login.username;
      authenticated = true;
      const promiseResult = this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
        this.setUsername(username);
        //return window.dispatchEvent(new CustomEvent('user:login'));
      });
    }
    return of(authenticated);
  }
  signup(username: string): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUsername(username);
      //return window.dispatchEvent(new CustomEvent('user:signup'));
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      //window.dispatchEvent(new CustomEvent('user:logout'));
    });
  }

  setUsername(username: string): Promise<any> {
    return this.storage.set('username', username);
  }

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}
