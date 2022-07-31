import React from 'react';
import {ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    // argTypes: {
    //     backgroundColor: { control: 'color' },
    // },
} as ComponentMeta<typeof EditableSpan>;

const changeCallback = action("Value changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"Start value"} onChange={changeCallback}/>
}