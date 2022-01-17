import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';

let variable: number;

Given('a variable is set to {int}', async (value: number) => {
    variable = value;
});

When('I increment this variable by {int}', async (value: number) => {
    variable += value;
});

Then('the variable should contain {int}', async (value: number) => {
    expect(variable).eq(value);
});
