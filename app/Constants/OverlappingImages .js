import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Colors from './Colors';

const OverlappingImages  = ({images}) => {
    if (!images || images.length === 0) {
        return null;
      }
    
      return (
        <View style={styles.container}>
          {images.map((image, index) => (
            <View key={index} style={[styles.imageContainer, { marginLeft: index * -10 }]}>
              <Image source={image} style={styles.image} />
            </View>
          ))}
          {images.length > 3 && (
            <View style={[styles.imageContainer, { marginLeft: 3 * -8 }]}>
              <View style={styles.additionalCount}>
                <Text style={styles.additionalCountText}>+{images.length - 3}</Text>
              </View>
            </View>
          )}
        </View>
      );
    }
export default OverlappingImages 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      imageContainer: {
        borderRadius: 25,
        overflow: 'hidden',
      },
      image: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      additionalCount: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.purple,
        justifyContent: 'center',
        alignItems: 'center',
      },
      additionalCountText: {
        color: 'white',
        fontWeight: 'bold',
      },
    
})