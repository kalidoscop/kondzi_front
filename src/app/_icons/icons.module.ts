import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Book, ExternalLink,CornerUpLeft, Edit, Facebook, Home, Inbox, Mail, Menu, PlusCircle, Search, Settings, Trash2, Twitter, User, UserPlus, Users, X, Youtube } from 'angular-feather/icons';

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
  Menu,
  Facebook,
  Mail,
  Twitter,
  Youtube,
  ExternalLink
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
