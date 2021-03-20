import React, { useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';

const BottomSheet = ({ children, onClose }) => {
  const modalizeRef = useRef(null);

  useEffect(() => {
    modalizeRef.current.open();
  }, [modalizeRef]);

  return (
    <Modalize
      withOverlay={false}
      ref={modalizeRef}
      handlePosition="inside"
      adjustToContentHeight
      childrenStyle={styles.content}
      keyboardAvoidingBehavior="padding"
      onClose={onClose}>
      {children}
    </Modalize>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 25,
  },
});

export default BottomSheet;
