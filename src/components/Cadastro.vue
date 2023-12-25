<script setup lang="ts">
import Button from 'primevue/button';
// @ts-ignore
import { getAuth, createUserWithEmailAndPassword,  sendEmailVerification } from 'firebase/auth';
// @ts-ignore
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// @ts-ignore
import firebase_app from '../store/firebase.config.js'
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import {toggleLoading} from '@/main';
const toast = useToast();
// method="POST"    

const onSubmit = async (cb:(value: void) => void | PromiseLike<void>, data: any) => {
        const storage = getStorage();
        const db = getFirestore(firebase_app);
        const auth = getAuth(firebase_app);
        
        createUserWithEmailAndPassword(auth, data.email, data.senha)
        .then((user) => {
            const filePath = `assinaturas/${user.user.uid}/${data.assinatura[0].name}`;
            if(auth.currentUser) sendEmailVerification(auth.currentUser);
            uploadBytes(ref(storage, filePath), data.assinatura[0])
            .then((snapshot) => {
                const profilePhotoPath = `assinaturas/${user.user.uid}/${data.foto.name}`;
                uploadBytes(ref(storage, profilePhotoPath), data.foto, {contentType: data.foto.type})
                .then(snap => {
                    setDoc(doc(db, "afiliados", user.user.uid), {
                        ativo: false, ...data, senha:null, assinatura: filePath, foto: profilePhotoPath
                    })
                })
                .then(cb);
            });

        })
        .catch((err:any) => {
            switch(err.code){
                case "auth/weak-password": toast.add({ severity: 'info', summary: 'Info', detail: "Senha deve ser no min 6 caracteres", life: 3000 });
                case "auth/email-already-in-use": toast.add({ severity: 'info', summary: 'Info', detail: "Email já está em uso", life: 3000 });
                default:
                    toast.add({ severity: 'info', summary: 'Info', detail: "Email inválido", life: 3000 });
                    toggleLoading();
                    break;
            }
        });

    };

const cadastrarAction = (ev:any) => {
    ev.preventDefault();
    toggleLoading();
    if(!ev.target.querySelector('input[name="Assinatura"]').files[0]){
        toast.add({ severity: 'info', summary: 'Info', detail: "Assinatura requerida", life: 3000 });
        toggleLoading();
        return;
    }
    if(!ev.target.querySelector('input[name="Foto"]').files[0]){
        toast.add({ severity: 'info', summary: 'Info', detail: "Foto requerida", life: 3000 });
        toggleLoading();
        return;
    }

    let striped = {};
    [...ev.target.querySelectorAll('input[Name]')]
        .filter(d => !['hidden', 'password', 'file'].includes(d.type))
        .map((inp:any) => (
            {[inp.name]: inp.value}
        ))
        // @ts-ignore
        .forEach(i => striped[Object.keys(i)] = Object.values(i)[0] )    

    onSubmit((response:any)=>{
        toast.add({  detail: "Cadastro concluído com sucesso, um email será enviado após a confirmação anti-spam", life: 3000 });
        toggleLoading();
    }, {
        assinatura: ev.target.querySelector('input[name="Assinatura"]').files, 
        email:ev.target.querySelector('input[name="Email"]').value, 
        senha:ev.target.querySelector('input[name="Senha"]').value,
        foto:ev.target.querySelector('input[name="Foto"]').files[0],
        dados: striped
    })
    setTimeout(() => {
        ev.target.submit();
    }, 1000);
}


</script>
<template>
    <Toast />
    <form method="POST" enctype="multipart/form-data" action="https://formsubmit.co/formsindicalsimmp@gmail.com" :onsubmit="cadastrarAction"
          class="MuiFormGroup-root styles_form__BVTXr styles_form-cadastro__sNqGN css-1h7anqn">
        <p>&nbsp;</p>
        <input type="hidden" name="_template" value="table">
        <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="nome" style="order:0;"><label
                class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
                data-shrink="true" for="outlined-required" id="outlined-required-label">Nome completo<span
                    aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
            <div
                class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
                <input aria-invalid="false" id="outlined-required" placeholder="Nome completo ..."
                    class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Nome">
                <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                    <legend class="css-14lo706"><span>Nome completo *</span></legend>
                </fieldset>
            </div>
        </div>
        <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="foto" style="order:1;"><label
                class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
                data-shrink="true" for="outlined-required" id="outlined-required-label">Foto 3/4<span aria-hidden="true"
                    class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
            <div
                class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
                <input aria-invalid="false" id="outlined-required" placeholder="Foto"
                    class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="file"  accept="image/jpeg,image/gif,image/png" name="Foto">
                <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                    <legend class="css-14lo706"><span>Foto 3/4 *</span></legend>
                </fieldset>
            </div>
        </div>
        <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="rg" style="order: 2;"><label
                class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
                data-shrink="true" for="outlined-required" id="outlined-required-label">RG<span aria-hidden="true"
                    class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder="" inputmode="numeric" pattern="[0-9]*"
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Rg">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>RG *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="cpf" style="order: 3;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">CPF<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder="" inputmode="numeric" pattern="[0-9]*"
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Cpf">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>CPF *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="naturalidade" style="order:4;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Naturalidade<span
                aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Naturalidade">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Naturalidade *</span></legend>
            </fieldset>
        </div>
    </div>
    
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="lote" style="order:6;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Lote<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Lote">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Lote *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="escola" style="order:7;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Escola<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Escola">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Escola *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="email" style="order:8;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Email<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder="exemplo@email.com"
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="email" name="Email">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Email *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="telefone" style="order: 9;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Telefone<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder="xx xxxx xxxx" inputmode="numeric"
                pattern="[0-9]*" class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text"
                name="Telefone">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Telefone *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="nascimento" style="order:10;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Nascimento<span
                aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="date" name="Nascimento">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Nascimento *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="cidade" style="order:11;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Cidade<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Cidade">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Cidade *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="uf" style="order:12;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Uf<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Uf">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Uf *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="cep" style="order: 13;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">CEP<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder="" inputmode="numeric" pattern="[0-9]*"
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Cep">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>CEP *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="endereco" style="order:14;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Endereço<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Endereço">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Endereço *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="Formação" style="order:15;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Formação<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Formação">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Formação *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="Função" style="order:16;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Função<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="Função">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Função *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="Admissão" style="order:17;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Data Admissão<span
                aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="date" name="Admissão">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Data Admissão *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="Admissão" style="order:17;"><label
        class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
        data-shrink="true" for="outlined-required" id="outlined-required-label">Data Admissão<span
            aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
    <div
        class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
        <input aria-invalid="false" id="outlined-required" placeholder=""
            class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="text" name="InsSocial">
        <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
            <legend class="css-14lo706"><span>Número de Inscrição Social</span></legend>
        </fieldset>
    </div>
</div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="senha" style="order:18;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Senha<span aria-hidden="true"
                class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="password" name="Senha">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Senha *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="confirmesenha" style="order:19;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Confirme senha<span
                aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="password">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Confirme senha *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl" data-name="Assinatura" style="order:20;"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for="outlined-required" id="outlined-required-label">Declaração de afiliação<span
                aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk css-sp68t1"> *</span></label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <input aria-invalid="false" id="outlined-required" placeholder=""
                class="MuiInputBase-input MuiOutlinedInput-input css-1x5jdmq" type="file" accept="application/pdf" name="Assinatura">
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Declaração de afiliação *</span></legend>
            </fieldset>
        </div>
    </div>
    <div class="MuiFormControl-root MuiTextField-root css-i44wyl"><label
            class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1ald77x"
            data-shrink="true" for=":r1b:" id=":r1b:-label">Estado Civil</label>
        <div
            class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-1v4ccyo">
            <select
                class="MuiNativeSelect-select MuiNativeSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-h8h8y"
                aria-invalid="false" id=":r1b:" name="Estado">
                <option value="Solteiro">Solteiro</option>
                <option value="Casado">Casado</option>
            </select><svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiNativeSelect-icon MuiNativeSelect-iconOutlined css-1636szt"
                focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
                <path d="M7 10l5 5 5-5z"></path>
            </svg>
            <fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac">
                <legend class="css-14lo706"><span>Estado Civil</span></legend>
            </fieldset>
        </div>
    </div><button
        class="p-button p-component MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium css-79xub"
        type="submit" data-pc-name="button" data-pc-section="root" tabindex="0"
        style="order: 20; flex-basis: 100%;">Cadastrar<span class="MuiTouchRipple-root css-w0pj6f"></span></button>
    </form>
    
    <div class="content">
        <h3>Porque ser associado?</h3>
        <p>Associar-se ao SIMMP vai muito além de descontos em serviços assistenciais. O objetivo da associação é, em
            primeira instância, romper com a hegemonia imposta pelos governantes, unindo parceiros que objetivam a conquista
            de uma educação municipal de qualidade.<br>O processo de filiação fortalece a luta e estabelece uma
        contraposição à política de sucateamento da educação. O Espírito coletivo constitui-se como um espaço fértil e
        contribui de maneira relevante para a efetividade da luta sindical.<br>A categoria é a parte fundamental para a
        existência do sindicato. Aliás, se esta opta pelo afastamento ou omissão, o professor encontra o seu direito de
        ‘voz’ fadado ao desaparecimento.<br>Portanto, a participação de cada docente é imprescindível para que o SIMMP
        cumpra a missão da categoria que representa.</p>
    <p>&nbsp;</p>
    <h3>Quem pode se associar?</h3>
    <p>Profissionais da educação efetivos ou contratados, que atuam na Rede de Ensino Municipal de Vitória da Conquista.
    </p>
    <p>&nbsp;</p>
    <h3>O que é preciso?</h3>
    <p>É necessário preencher e assinar a ficha de cadastro, onde deverão ser informados dados como CPF e RG, número de
        matrícula, lote, nível, situação funcional, data de admissão, unidade escolar onde está lotado, etc.</p>
        <p>A ficha de cadastro deve ser entregue na sede do sindicato ou durante as assembleias da categoria.</p>
        <p>O sindicalizado contribui com 1% (um por cento) do seu salário base, sendo o desconto feito em contracheque.</p>
    </div>
</template>

<style lang="scss" scoped>

@import '../vars.scss';

.MuiFormGroup-root {
    max-width: 90vw;
    margin-top: 3em;
    float: right;
    height: 100%;
    width: 15cm;
    margin-left:2cm;

}

.content {
    width: 14cm;
    max-width: 50%;
    margin-left: 5em;
}
[aria-hidden] {
    display: none;
}

@media (min-width: 1024px) {}</style>
