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
        if (!!this.props.data && this.props.data.length > 0) {
            return <List dataArray={_.sortBy(this.props.data, ["id"])}
                renderRow={item => (<ListItem thumbnail>
                    <Left>
                        {_.get(item, "thumb") && item.thumb.trim() !== "" 
                            ? <Thumbnail square source={{ uri: item.thumb }} style={{width: 60, height: 60}} /> 
                            : <Icon name="md-image" style={{fontSize: 60, width: 60}} />}
                    </Left>
                    <Body>
                        <Text>{item.title}</Text>
                        <Text note>{item.type} - {item.year}</Text>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>Format :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(item.format).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>Label :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(item.label).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>BC :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(item.barcode).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
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
