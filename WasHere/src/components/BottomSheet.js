import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";

const BottomSheet = ({ bottomSheetRef, children, onClose, openOnLoad, ...props }) => {
  useEffect(() => {
    if (openOnLoad) bottomSheetRef.current.open();
  }, [bottomSheetRef]);

  return (
    <Modalize
      {...props}
      withOverlay={false}
      ref={bottomSheetRef}
      handlePosition="inside"
      keyboardAvoidingBehavior="padding"
      onClosed={onClose}>
      {children}
    </Modalize>
  );
};

export default BottomSheet;
