import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import  Button from './button/button';
import  Input from './input/input';
import Lable from './lable/lable';
import Form from './form/form';
import Item from './item/item';
import User from './user/user';
import Cancel from './cancelButton/cancelButton';
import AddButton from './addButton/addButton';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
   .add('default', () => <Button onClick={action('clicked')}> Submit </Button> )
   .add('small', () => <Button className="small" onClick={action('clicked')}> x </Button> );
storiesOf('Cancel Button', module)
   .add('default', () => <Cancel onClick={action('clicked')}/> );
storiesOf('Add Button', module)
   .add('default', () => <AddButton>Add</AddButton> );
storiesOf('Input', module)
   .add('default', () => <Input  onClick={action('clicked')}/> );
storiesOf('Lable', module)
   .add('default', () => <Lable  onClick={action('clicked')}> Some lable text </Lable> )
   .add('medium', () => <Lable className="medium" onClick={action('clicked')}> Some lable text </Lable>);
storiesOf('Form', module)
   .add('default', () => <Form  onClick={action('clicked')}> Some form text </Form> );
storiesOf('Item', module)
   .add('book', () => <Item className="book color" onClick={action('clicked')} name = "Some name book text"/> )
   .add('note', () => <Item className="notepad color" onClick={action('clicked')} name = "Some name book text"/> )
   .add('chosen book', () => <Item className="book chosen" onClick={action('clicked')}> Some name book text </Item> );
storiesOf('User', module)
   .add('user', () => <User  onClick={action('clicked')}> Some name book text </User> );
