import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Book, CornerUpLeft, Edit, Home, Inbox, Menu, PlusCircle, Search, Settings, Trash2, User, UserPlus, Users, X } from 'angular-feather/icons';

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
  CornerUpLeft,
  UserPlus,
  Trash2,
  Search,
  Menu
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
