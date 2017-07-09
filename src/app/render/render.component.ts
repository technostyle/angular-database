import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-render',
  templateUrl: './render.component.html',
  styleUrls: ['./render.component.css']
})
export class RenderComponent implements OnInit {

  users = [];
  userIds = [];
  selectedUsers = [];
  user: FormGroup;

  constructor(private requestService: RequestService) { 
  	
    requestService.getAllUsers().subscribe((res) => {
      var obj = res.json() || {}
      var users = Object.keys(obj).map(key => obj[key]);
      // firebase feature : userX = { bigStrangeKey : {user}}
      users = users.map(user => { var key = Object.keys(user)[0]; return user[key]; });

      this.users = users;
      this.userIds = users.map(user => user.id)
    });
  }

  userSelected(user){
    return this.selectedUsers.indexOf(user.id) !== -1 
  }

  onSelectClick(user) {
      let index = this.selectedUsers.indexOf(user.id);
      if (index === -1) {
        this.selectedUsers.push(user.id);      
      }
      else {
        this.selectedUsers.splice(index, 1);
      }
  }  

  onDeleteClick(user) {
    this.requestService.deleteUser("user" + user.id);
    let index = this.users.indexOf(user);
    this.users.splice(index, 1);
    index = this.userIds.indexOf(user.id);
    this.userIds.splice(index, 1);
  }

  
  onSubmit() {
    this.users.push(this.user.value);
    this.userIds.push(this.user.value.id);
    this.requestService.addUser(this.user.value);

    this.user.setValue({
      name : null,
      password : null,
      profession : null,
      id : null
    });
  }

  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      profession: new FormControl('', Validators.required),
      id: new FormControl('', [Validators.required, this.validateId.bind(this)])
    });
  }

  validateId(c: FormControl)  {
    return (this.userIds.indexOf(c.value) === -1) ? null : {
        validateId: {
          valid: false
        }
      }

    } 
}

