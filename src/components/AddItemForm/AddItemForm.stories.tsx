import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    // },
} as ComponentMeta<typeof AddItemForm>;

const callback = action("Button add was pressed inside the form")

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback}/>
}