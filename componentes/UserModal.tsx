//MODAL
import React, { useEffect, useRef } from 'react';
import {Animated,Dimensions,StyleSheet,TouchableWithoutFeedback,View} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

type ModalProps = {    //PROPS DO MODAL
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number; //largura opcional
};

export default function SlideInFromLeftModal({
  visible,
  onClose,
  children, //CONTEÚDO ENTRE AS TAGS DE ABERTURA E FECHAMENTO DE UM COMPONENTE
  width = SCREEN_WIDTH * 0.7, //MUDO O TAMANHO DO MEU MODAL
}: ModalProps) {
  const slideAnim = useRef(new Animated.Value(-width)).current;   //CRIA ANIMAÇÃO COM VALOR INICIAL FORA DA TELA

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,   //ENTRA NA TELA
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,    //SAI DA TELA PELA ESQUERDA 
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);    //APARECE/DESAPARECE

  if (!visible) return null;  //RETORNA NADA

  return (
    <TouchableWithoutFeedback onPress={onClose}   //Overlay clicável (para fechar o modal)
    >  
      <View style={styles.overlay}>
        <TouchableWithoutFeedback //detecta cliques fora do modal.
        >
          <Animated.View  //O conteúdo animado do modal
          style={[styles.modalContent, { left: slideAnim, width }]}>
            {children}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    
  },
  modalContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#222',
    padding: 20,
    borderRightWidth: 3,
    borderColor: "#993399",
    borderEndEndRadius: 10,
    borderTopEndRadius: 10,
  },
});
