import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

const SourceCard = (props) => (
    <Card>
        <CardTitle title={props.title}/>
        <CardText>{props.children}</CardText>
    </Card>
);

export default SourceCard;