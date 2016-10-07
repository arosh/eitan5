import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

const SourceCard = (props) => (
    <Card>
        <CardTitle title={props.title}/>
        <CardText style={{ fontSize: "16px" }}>{props.children}</CardText>
    </Card>
);

export default SourceCard;