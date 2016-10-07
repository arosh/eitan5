import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const SourceCard = (props) => (
    <Card>
        <CardHeader title={props.title}/>
        <CardText>{props.children}</CardText>
    </Card>
);

export default SourceCard;