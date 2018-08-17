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
    Title
} from "native-base";
import React, { Component } from "react";
import { SwipeListView } from 'react-native-swipe-list-view';
import { View } from 'react-native';

import PropTypes from "prop-types";
import _ from "lodash";

export default class ListResultBC extends Component {


    constructor(props) {
        super(props);
    }

    
    render() {
        if (!!this.props.data && this.props.data.length > 0) {
            return <SwipeListView
                useFlatList
                data={this.props.data}
                renderItem={(rowData, rowMap) => (<ListItem thumbnail style={{paddingLeft: 10, paddingRight: 10}}>
                    <Left>
                        {_.get(rowData.item, "thumb") && rowData.item.thumb.trim() !== "" 
                            ? <Thumbnail square source={{ uri: rowData.item.thumb }} style={{width: 60, height: 60}} /> 
                            : <Icon name="md-image" style={{fontSize: 60, width: 60}} />}
                    </Left>
                    <Body>
                        <Text>{rowData.item.title}</Text>
                        <Text note>{rowData.item.type} - {rowData.item.year}</Text>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>Format :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(rowData.item.format).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>Label :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(rowData.item.label).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <Text note style={{color: "black", flex: 1}}>BC :</Text>
                            <Text note style={{flex: 3}} numberOfLines={3}>{_.chain(rowData.item.barcode).uniq().map(e => e).join(", ").value()}</Text>
                        </View>
                    </Body>
                    </ListItem>)    
                }
                renderHiddenItem={(data, rowMap) => (
                    <View>
                        <Text>Left</Text>
                        <Text>Right</Text>
                    </View>
                )}
            />;

        } else {
            return <Text>Pas de résultat</Text>;
        }
    }
}

ListResultBC.propTypes = {
    data: PropTypes.array.isRequired
};
