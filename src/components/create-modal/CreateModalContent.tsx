import React from 'react';
import { FoodData } from '../../interface/FoodData';

import "./modal-content.css";

interface CreateModalContentProps {
  foodData: FoodData;
  closeModal: () => void;
}

export function CreateModalContent({ foodData, closeModal }: CreateModalContentProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Nome da</h2>
        <p>Categoria:</p>
        <p>Segue receita passo passo</p>
        {/* Adicione outros elementos conforme necessário */}
        <button onClick={closeModal} className="btn-secondary">
          Fechar
        </button>
      </div>
    </div>
  );
}
