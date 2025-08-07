import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { CustomerList } from './components/customer-list/customer-list';
import { CustomerCreate } from './components/customer-create/customer-create';
import { CustomerDetails } from './components/customer-details/customer-details';
import { CustomerUpdate } from './components/customer-update/customer-update';

export const routes: Routes = [
{
    path:"",

    component:CustomerList
    },

    {
    path:"customer-create",

    component:CustomerCreate
    },
    {
    path:"customer-details/:id",

    component:CustomerDetails
    },
    {
    path:"customer-update/:id",

    component:CustomerUpdate
    },

];
