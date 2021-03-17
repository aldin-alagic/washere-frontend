import React, { useRef, useEffect } from 'react';
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
      style={{ flex: 1 }}
      keyboardAvoidingBehavior="padding"
      onClose={onClose}>
      {children}
    </Modalize>
  );
};

export default BottomSheet;
