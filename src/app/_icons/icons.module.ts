import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Book, Edit, Home, Inbox, PlusCircle, Settings, User, Users, X } from 'angular-feather/icons';

const icons = {
  User,
  Home,
  Book,
  Users,
  Inbox,
  Settings,
  Edit,
  PlusCircle,
  X,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})

export class IconsModule { }
