<script setup lang="ts">
import { type defaultUserData } from '../store/index';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { ref as vref } from 'vue'
const props = defineProps<{ user: any }>()

// Create a reference with an initial file path and name
const storage = getStorage();

const cartãoSkip = [
    'Email', 'Telefone', 'Formação'
]
const renderData = (dados: defaultUserData) => {
    return {
        frente: {
            "Nome": dados.Nome,
            "Rg": dados.Rg,
            "Cpf": dados.Cpf,
            "Matrícula": dados.Matrícula,
            "Email": dados.Email,
            "Telefone": dados.Telefone,
            "Nascimento": dados.Nascimento,
            "Formação": dados.Formação,
            "Função": dados.Função,
            "Admissão": dados.Admissão,
            "InscSocial": dados.InscSocial
        },
        atras: {
            "Endereço": dados.Endereço,
            "Escola": dados.Escola,
            "Cidade": dados.Cidade,
            "Uf": dados.Uf,
            "Cep": dados.Cep,
            "Naturalidade": dados.Naturalidade,
            "Lote": dados.Lote,
        }
    }
}

const fields = [
    ["Foto 3/4", "Foto", "file", "Foto", "foto", "setFoto", "1"],
    ["Nome completo", "Nome", "text", "Nome completo ...", "nome", "setNome", "2"],
    ["RG", "Rg", "number", "", "rg", "setRG", "1"],
    ["CPF", "Cpf", "number", "", "cpf", "setCPF", "1"],
    ["Naturalidade", "Naturalidade", "text", "", "naturalidade", "setNaturalidade", "2"],
    ["Matrícula", "Matrícula", "text", "", "matricula", "setMatricula", "2"],
    ["Inscrição Social", "InsSocial", "text", "", "inscsocial", "setInscSocial", "2"],
    
    ["Telefone", "Telefone", "number", "xx xxxx xxxx", "telefone", "setTelefone", "1"],
    ["Email", "Email", "email", "exemplo@email.com", "email", "setEmail", "2"],
    ["Nascimento", "Nascimento", "date", "", "nascimento", "setNascimento", "1"],
    ["Cidade", "Cidade", "text", "", "cidade", "setCidade", "2"],
    ["Uf", "Uf", "text", "", "uf", "setUf", "1"],
    ["CEP", "Cep", "number", "", "Cep", "setCep", "1"],
    ["Endereço", "Endereço", "text", "", "endereco", "setEndereco", "2"],
];

const rendered = renderData(props.user.dados);

const pathReference = ref(storage, props.user.foto);
const p = vref(await getDownloadURL(pathReference));

// const atualizar = () => {
//     console.log(rendered.frente);

//     // @ts-ignore
//     let profilePhotoIEl: HTMLInputElement = document.querySelector('label[for="Foto"]')?.nextElementSibling;
//     const storage = getStorage();
//     const db = getFirestore(firebase_app);
//     // @ts-ignore
//     if (profilePhotoIEl.files[0]) {
//         // @ts-ignore
//         const profilePhotoPath = `assinaturas/${props.user.uid}/${profilePhotoIEl.files[0].name}`;
//         // @ts-ignore
//         if (profilePhotoIEl.files)
//             // @ts-ignore
//             uploadBytes(ref(storage, profilePhotoPath), profilePhotoIEl.files[0], { contentType: profilePhotoIEl.files[0].type })
//                 .then((snap) => {
//                     updateDoc(doc(db, "afiliados", props.user.uid), {
//                         dados: { ...rendered.frente },
//                         foto: profilePhotoPath
//                     }).then(async () => {
//                         toast.add({ detail: "Alterações salvas com sucesso", life: 3000 });
//                         p.value = await getDownloadURL(snap.ref)
//                     })
//                         .catch(err => {
//                             toast.add({ detail: "Um erro ocorreu ao atualizar os dados\n" + err.code, life: 3000 });
//                         })
//                 })
//     }
//     else {
//         updateDoc(doc(db, "afiliados", props.user.uid), {
//             dados: { ...rendered.frente },
//         })
//             .then(() => {
//                 toast.add({ detail: "Alterações salvas com sucesso", life: 3000 });
//             })
//             .catch(err => {
//                 toast.add({ detail: "Um erro ocorreu ao atualizar os dados\n" + err.code, life: 3000 });
//             })
//     }

// }



</script>

<template>
    <Toast />
    <!-- <div class="container" id="profile-page">
        <fieldset>

            <fieldset class="form-group row">
                <img :src="p" height="200" style="margin-top: 1em;max-height: 14em;
                object-fit: contain;" class="col s4" alt="">
                <div :class="'flex flex-column gap-2 col s' + ((parseInt(field[6])) * 4)" v-for="field, index of fields"
                    :key="field[0]">
                    <label :for="field[1]">{{ field[0] }}</label>
                    @vue-ignore
                    <InputText :disabled="field!='Foto'" class="form-control" :type="field[2]" v-model="(rendered.frente[field[1]] as string)"
                        :placeholder="field[0]" />
                </div>

            </fieldset>

            <button v-on:click="atualizar" style="margin-left: auto;
            display: block;background-color: rgba(16, 130, 18, 0.8156862745);"
                class="btn btn-lg btn-primary pull-xs-right">
                Atualizar
            </button>
        </fieldset>
    </div> -->

    <h3>Imprima essa página para carteirinha</h3>

    <div className="mx-auto my-10 justify-center flex" id="carteirinha-impressao">
        <div class="carteirinha row frente">
            <div class="item Foto">
                <img :src="p" />
            </div>
            <div :class="'item ' + key"
                v-for="key, index of Object.keys(rendered.frente).filter(k => !cartãoSkip.includes(k))">
                <span>
                    {{ //@ts-ignore
                        rendered.frente[key] }}
                </span>
            </div>
        </div>
        <div class="carteirinha atras row">
            <div :class="'item ' + key"
                v-for="key, index of Object.keys(rendered.atras).filter(k => !cartãoSkip.includes(k))">
                <span>
                    {{ //@ts-ignore
                        rendered.atras[key] }}
                </span>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
#profile-page {
    margin: 0px;
    width: 500px;

    fieldset {
        border: none
    }
}

h3{
    width: 500px;
}

@media print {
    h3{
        display: none;
    }
}

#carteirinha-impressao {
    width: 500px;
    display: flex;
    flex-direction: column;
    .carteirinha {
        background-size: 100% 100%;
        width: 24pc;
        height: 15pc;
        display: grid;
        grid-template-rows: repeat(auto, 30px);
    }

    .item {
        position: absolute;
        text-align: center;
    }

    .frente {
        background-image: url('./carteirinha-03.svg');

    }

    .atras {
        background-image: url('./carteirinha-04.svg');

        .item {
            font-size: 0.6pc;
            height: 0.9pc;
            line-height: 0.2pc;
            text-align: left;
        }
    }


    .Foto {
        width: 5.5pc;
        margin: 0.4pc 0 0 17.7pc;

        img {
            border-radius: 7px;
            object-fit: cover;
            height: 100%;
            width: 100%;
        }

        height: 7.5pc;
    }

    .Nome {
        margin-top: 6.5pc;
        margin-left: 1pc;
        width: 15pc;
        text-align: center;
    }

    .Rg {
        margin-top: 10.8pc;
        margin-left: 12.7pc;
        width: 10pc;
    }

    .Cpf {
        margin: 10.8pc 0pc 0pc 1pc;
        width: 10.5pc;
    }

    .Matrícula {
        margin: 13pc 0pc 0pc 8.5pc;
        width: 7pc;
    }

    .Nascimento {
        margin: 13pc 0pc 0pc 1.5pc;
        width: 6pc;
    }

    .Admissão {
        margin: 13pc 0pc 0pc 16.7pc;
        width: 6pc;
    }

    .Função {
        margin: 8.7pc 0pc 0pc 1.7pc;
        width: 15pc;
    }

    .Naturalidade {
        width: 11.5pc;
        margin: 3.4pc 0 0 5.7pc;
    }

    .Cidade {
        width: 19.5pc;
        margin: 7.45pc 0 0 3.7pc;
    }

    .Uf {
        width: 4pc;
        margin: 3.4pc 0 0 19pc;
    }

    .Cep {
        width: 19pc;
        margin: 6.4pc 0 0px 3.7pc;
    }

    .Lote {
        width: 19pc;
        margin: 9.5pc 0 0px 3.7pc;
    }

    .Escola {
        width: 19pc;
        margin: 1.4pc 0 0px 3.7pc;
    height: 1.8pc !important;
    }

    .Endereço {
        width: 19pc;
        margin: 4.4pc 0 0px 3.7pc;
        height: 1.8pc !important;
    }
    .InscSocial{
        margin: 8.7pc 0pc 0pc 18pc;
  width: 5pc;
    }

}

</style>