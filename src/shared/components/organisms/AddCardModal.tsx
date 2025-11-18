import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../app/store';
import { addCartaoThunk } from '../../../features/cartao/services/cartaoThunks';
import type { AddCartaoRequest, Cartao } from '../../../features/cartao/types';
import CreditCard from '../molecules/CreditCard';
import FormField from '../molecules/FormField';
import ColorPreviewField from '../molecules/ColorPreviewField';
import ColorPickerModal from '../organisms/ColorPickerModal';
import styles from './AddCardModal.module.css';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

type FormErrors = {
    [key: string]: string;
};

const AddCardModal = ({ isOpen, onClose }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.cartao);

    const [nome, setNome] = useState('');
    const [limite, setLimite] = useState<number | ''>('');
    const [limiteUsado, setLimiteUsado] = useState<number | ''>('');
    const [parcelasSaldoAntigo, setParcelasSaldoAntigo] = useState<number | ''>('');

    const [diaFechamento, setDiaFechamento] = useState<number | ''>('');
    const [diaVencimento, setDiaVencimento] = useState<number | ''>('');
    const [corHex, setCorHex] = useState('#007BFF');
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    if (!isOpen) return null;

    const resetFields = () => {
        setNome('');
        setLimite('');
        setLimiteUsado('');
        setParcelasSaldoAntigo('');
        setDiaFechamento('');
        setDiaVencimento('');
        setCorHex('#007BFF'); 
        setErrors({}); 
    };

    const previewCartao: Cartao = {
        id: 0,
        nome: nome || "Nome do Cartão",
        limite: typeof limite === 'number' ? limite : 0,
        limiteDisponivel: (typeof limite === 'number' ? limite : 0) - (typeof limiteUsado === 'number' ? limiteUsado : 0),
        diaFechamento: typeof diaFechamento === 'number' ? diaFechamento : 1,
        diaVencimento: typeof diaVencimento === 'number' ? diaVencimento : 10,
        cor: corHex,
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!nome.trim()) {
            newErrors.nome = "O nome do cartão é obrigatório.";
        }

        if (!limite || Number(limite) <= 0) {
            newErrors.limite = "Informe um limite válido maior que zero.";
        }

        if (!diaFechamento || diaFechamento < 1 || diaFechamento > 31) {
            newErrors.diaFechamento = "Dia inválido (1-31).";
        }

        if (!diaVencimento || diaVencimento < 1 || diaVencimento > 31) {
            newErrors.diaVencimento = "Dia inválido (1-31).";
        }

        if (typeof limiteUsado === 'number' && limiteUsado > 0) {
            if (!parcelasSaldoAntigo || Number(parcelasSaldoAntigo) <= 0) {
                newErrors.parcelasSaldoAntigo = "Informe em quantas vezes vai pagar.";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleCancel = () => {
        resetFields();
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const cartaoData: AddCartaoRequest = {
            nome,
            limite: Number(limite),
            limiteUsado: Number(limiteUsado) || 0,
            parcelasSaldoAntigo: Number(parcelasSaldoAntigo) || 1,
            diaFechamento: Number(diaFechamento),
            diaVencimento: Number(diaVencimento),
            corHex,
        };

        try {
            await dispatch(addCartaoThunk(cartaoData)).unwrap();

            handleCancel();
        } catch (err) {
            //TODO adicionar tratamento de tooltips
            console.error("Falha ao adicionar cartão:", err);
        }
    };

    const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number | ''>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (errors[e.target.id]) {
            setErrors(prev => ({ ...prev, [e.target.id]: '' }));
        }

        if (val === '') {
            setter('');
        } else {
            const num = parseFloat(val);
            if (!isNaN(num)) setter(num);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errors.nome) setErrors(prev => ({ ...prev, nome: '' }));
        setNome(e.target.value);
    };

    const temDivida = typeof limiteUsado === 'number' && limiteUsado > 0;

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <h2>Adicionar Novo Cartão</h2>
                </header>

                <div className={styles.previewContainer}>
                    <CreditCard cartao={previewCartao} />
                </div>

                <form onSubmit={handleSubmit} className={styles.formContainer}>
                    <FormField
                        label="Nome do Cartão"
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={handleTextChange}
                        placeholder="Ex: Nubank, Inter, etc."
                        error={errors.nome}
                    />

                    <div className={styles.row}>
                        <FormField
                            label="Limite Total (R$)"
                            id="limite"
                            type="number"
                            value={limite}
                            onChange={handleNumberChange(setLimite)}
                            placeholder="5000"
                            error={errors.limite}
                        />
                        <FormField
                            label="Limite Usado (R$)"
                            id="limiteUsado"
                            type="number"
                            value={limiteUsado}
                            onChange={handleNumberChange(setLimiteUsado)}
                            placeholder="0"
                        />
                    </div>

                    {temDivida && (
                        <div className={styles.row}>
                            <FormField
                                label="Em quantos meses pretende quitar?"
                                id="parcelasSaldoAntigo"
                                type="number"
                                min="1"
                                max="99"
                                value={parcelasSaldoAntigo}
                                onChange={handleNumberChange(setParcelasSaldoAntigo)}
                                placeholder="Ex: 12"
                                error={errors.parcelasSaldoAntigo}
                            />
                        </div>
                    )}

                    <div className={styles.row}>
                        <FormField
                            label="Dia Fechamento"
                            id="diaFechamento"
                            type="number"
                            min="1" max="31"
                            value={diaFechamento}
                            onChange={handleNumberChange(setDiaFechamento)}
                            placeholder="20"
                            error={errors.diaFechamento}
                        />
                        <FormField
                            label="Dia Vencimento"
                            id="diaVencimento"
                            type="number"
                            min="1" max="31"
                            value={diaVencimento}
                            onChange={handleNumberChange(setDiaVencimento)}
                            placeholder="28"
                            error={errors.diaVencimento}
                        />
                    </div>

                    <ColorPreviewField
                        label="Cor do Cartão"
                        color={corHex}
                        onClick={() => setIsColorModalOpen(true)}
                    />

                </form>

                <footer className={styles.footer}>
                    <button type="button" className={styles.cancelButton} onClick={onClose} disabled={loading}>
                        Cancelar
                    </button>
                    <button type="submit" className={styles.submitButton} disabled={loading} onClick={handleSubmit}>
                        {loading ? 'Salvando...' : 'Salvar Cartão'}
                    </button>
                </footer>
            </div>

            <ColorPickerModal
                isOpen={isColorModalOpen}
                onClose={() => setIsColorModalOpen(false)}
                currentColor={corHex}
                onColorSelect={setCorHex}
            />
        </div>
    );
};

export default AddCardModal;