<template>
    <v-card :loading="loading" class="mx-auto my-12" max-width="420">
        <template slot="progress">
            <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>
        <v-img class="spacing-playground pa-6" contain src="https://i.ytimg.com/vi/sju9XsN6Hb0/maxresdefault.jpg"
            max-width="100%"></v-img>
        <v-card-title>Registro de usuario.</v-card-title>

        <v-card-text>
            <br>
            <div>Registrate y disfruta de la mejor plataforma para ofrecer tus productos.</div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Ingresa tus datos.</v-card-title>

        <v-card-action>
            <v-container class="grey lighten-5">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-text-field label="Nombres" solo></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center" no-gutters>
                    <v-col cols="6">
                        <v-text-field label="Apellido paterno" solo></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field label="Apellido materno" solo></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center" no-gutters>
                    <v-col>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition"
                            offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="date" label="Fecha de nacimiento" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on" solo></v-text-field>
                            </template>
                            <v-date-picker v-model="date" :active-picker.sync="activePicker"
                                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                min="1950-01-01" @change="save"></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row ajustify="center" no-gutters>
                    <v-col cols="6">
                        <v-text-field label="C.I." solo></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="3">
                        <v-select :items="Extensiones" solo></v-select>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field label="00" solo></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center" no-gutters>
                    <v-col>
                        <v-text-field label="Apellido paterno" solo></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field label="Apellido materno" solo></v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="mx-4"></v-divider>

            <v-container fluid>
                <v-text-field label="Correo electrónico" solo></v-text-field>
                <v-text-field label="Teléfono" solo></v-text-field>
                <v-text-field label="Contraseña" solo></v-text-field>
            </v-container>
        </v-card-action>



        <v-card-actions>
            <v-container>
                <v-row justify="center">
                    <v-col cols="5">
                        <v-btn outlined color=rgb(252,81,133) block>
                            Limpiar
                        </v-btn>
                    </v-col>

                    <v-col cols="7">
                        <v-btn depressed color=rgb(33,230,193) block>
                            Guardar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>



        </v-card-actions>


    </v-card>


</template>


<script>
export default {
    data: () => ({
        Extensiones: ["LP", "CB", "SC", "OR", "PO", "CH", "TJ", "PA", "BE"],
    }),
}
</script>
