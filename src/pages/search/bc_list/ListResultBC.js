import {
    Body,
    Button,
    Container,
    Content,
    Fab,
    FlatList,
    Header,
    Icon,
    IconNB,
    Left,
    List,
    ListItem,
    Right,
    Spinner,
    Subtitle,
    Text,
    Thumbnail,
    Title,
    View
} from "native-base";
import React, { Component } from "react";

import PropTypes from "prop-types";
import _ from "lodash";

export default class ListResultBC extends Component {


    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.data && this.props.data.length > 0) {
            return <List dataArray={_.sortBy(this.props.data, ["id"])}
                renderRow={item => (<ListItem thumbnail>
                    <Left>
                        {_.get(item, "thumb") && item.thumb.trim() !== "" 
                            ? <Thumbnail square source={{ uri:  item.thumb }} style={{width: 60, height: 60}} /> 
                            : <Icon name="md-image" style={{fontSize: 60, width: 60}} />}
                    </Left>
                    <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.year}</Text>
                        <Text note>{_.chain(item.label).map(e => e).join(",").value()}</Text>
                        <Text note>{_.chain(item.barcode).map(e => e).join(",").value()}</Text>
                    </Body>

                    </ListItem>)
                }
            />;

        } else {
            return <Text>Pas de résultat</Text>;
        }
    }
}

ListResultBC.propTypes = {
    data: PropTypes.array.isRequired
};
