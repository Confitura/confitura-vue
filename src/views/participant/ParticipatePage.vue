<template>
    <div class="particiate">
        <PageHeader title="Registration form" type="peace"></PageHeader>
        <Box class="content " color="white">
            <!--            <p v-if="!form">-->
            <!--                Unable to register as participant:-->
            <!--                <span v-for="error in errors.voucher">-->
            <!--                    <br/>-->
            <!--                    <span v-if="error === 'INVALID'">invalid voucher</span>-->
            <!--                    <span v-if="error === 'TAKEN'">voucher already used</span>-->
            <!--                    <span v-else>unknown error {{error}}</span>-->
            <!--                </span>-->
            <!--            </p>-->
            <div>
                <h4 class="participate__info">All fields required</h4>
                <h2 class="participate__title">Personal information</h2>
                <div class="row">
                    <form @submit="save" class="col s12" novalidate>
                        <div class="row">
                            <md-field>
                                <label>first name</label>
                                <md-input v-model="form.firstName"></md-input>
                            </md-field>
                        </div>
                        <div class="row">
                            <md-field>
                                <label>last name</label>
                                <md-input v-model="form.lastName"></md-input>
                            </md-field>
                        </div>
                        <div class="row">
                            <md-field>
                                <label>e-mail address</label>
                                <md-input v-model="form.email"></md-input>
                            </md-field>
                        </div>
                        <div class="row">
                            <label class="tshirtCut__label">t-shirt cut</label>
                            <div class="input-field col s12">
                                <md-radio v-model="form.gender" value="m">male</md-radio>
                                <md-radio v-model="form.gender" value="f">female</md-radio>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <md-field>
                                    <label for="t-shirt-size">t-shirt size</label>
                                    <md-select v-model="form.size" name="t-shirt-size" id="t-shirt-size" required>
                                        <md-option value="S">S</md-option>
                                        <md-option value="M">M</md-option>
                                        <md-option value="L">L</md-option>
                                        <md-option value="XL">XL</md-option>
                                        <md-option value="XXL">XXL</md-option>
                                    </md-select>
                                </md-field>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s12">
                                <md-checkbox v-model="form.privacyPolicyAccepted" required>I accept the
                                    <router-link
                                            to="privacy-policy">privacy policy
                                    </router-link>
                                </md-checkbox>

                                <div class="errors helper-text" v-for="error in errors.privacyPolicyAccepted">
                                    {{error}}
                                </div>

                            </div>
                        </div>

                        <div class="row">
                            <h2 class="participate__title">Tell us more about you</h2>
                            <div class="participate__statisticsInfo">This data will be used for statistics only, and will not be associated
                                with your
                                personal profile. Thanks to them we will be
                                able to better tailor our agenda to the needs of our participants in future editions.
                            </div>
                        </div>

                        <div class="row">
                            <label class="tshirtCut__label">meal option</label>
                            <div class="input-field col s12">
                                <md-radio v-model="form.mealOption" value="meat">meat</md-radio>
                                <md-radio v-model="form.mealOption" value="vegetarian">vegetarian</md-radio>
                            </div>
                            <span class="md-helper-text">Food note: We can't guarantee that you will be able to get option that you have selected. The food at confitura will not be portioned, so first come - first served.</span>
                        </div>
                        <div class="row">
                            <md-field>
                                <label>city</label>
                                <md-input v-model="form.city" maxlength="255" required></md-input>
                            </md-field>
                        </div>
                        <div class="row">
                            <md-field>
                                <label for="experience">experience</label>
                                <md-select v-model="form.experience" name="experience" id="experience" required>
                                    <md-option value="I am just learning">I am just learning</md-option>
                                    <md-option value="Less than a year">Less than a year</md-option>
                                    <md-option value="1-2 years">1-2 years</md-option>
                                    <md-option value="2-4 years">2-4 years</md-option>
                                    <md-option value="4-8 years">4-8 years</md-option>
                                    <md-option value="Over 8 years">Over 8 years</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="row">
                            <md-field>
                                <label for="role">role</label>
                                <md-select v-model="form.role" name="role" id="role" required>
                                    <md-option value="student">Student</md-option>
                                    <md-option value="Developer">Developer</md-option>
                                    <md-option value="Team Leader">Team Leader</md-option>
                                    <md-option value="Project Leader">Project Leader</md-option>
                                    <md-option value="Architect">Architect</md-option>
                                    <md-option value="Tester">Tester</md-option>
                                    <md-option value="Other">Other</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="row">

                        <span v-for="error in errors.form">
                             {{error}} <br/>
                        </span>
                        </div>
                        <div class="row">
                            <md-button type="submit" class="md-raised md-accent">Save</md-button>
                        </div>
                    </form>
                </div>
            </div>

        </Box>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Box from '@/components/Box.vue';
  import TheContact from '@/components/TheContact.vue';
  import axios from 'axios';
  import PageHeader from '@/components/PageHeader.vue';
  import { Participant, RegistrationForm } from '@/types';
  import { validEmail } from '@/validation-utils';
  import { MdButton, MdCheckbox, MdField, MdList, MdMenu, MdRadio } from 'vue-material/dist/components';
  import 'vue-material/dist/vue-material.min.css';

  Vue.use(MdButton);
  Vue.use(MdField);
  Vue.use(MdRadio);
  Vue.use(MdMenu);
  Vue.use(MdList);
  Vue.use(MdCheckbox);
  @Component({
    components: { PageHeader, Box, TheContact },
  })
  export default class ParticipatePage extends Vue {
    public form: RegistrationForm = { voucher: { id: 'abc' } };
    public errors: any = {};

    public mounted() {
      // M.AutoInit();
      const { voucher } = this.$route.query;
      axios.get(`/api/vouchers/${voucher}/check`).then((value) => {
        this.form = { voucher: { id: voucher as string } };
        // setTimeout(() => {
        //   M.updateTextFields();
        //   M.FormSelect.init(document.querySelectorAll('select'));
        // });
      }, (reason) => {
        this.errors = { voucher: [reason.response.data] };
      });
    }

    // public updated() {
    //   M.updateTextFields();
    // }

    public save(event: Event) {
      event.preventDefault();
      if (this.validate()) {
        // do save
        axios.post<Participant>('/api/participants', this.form)
          .then((it) => {
            const id: string = it.data.id as string;
            this.$router.push({ name: 'participant', params: { id } });
          });
      }
    }


    private validate() {
      const errors: any = {};
      if (this.form == null) {
        return false;
      }
      let valid = true;

      if (!this.form.email || !validEmail(this.form.email)) {
        errors.email = ['invalid email'];
        valid = false;
      }
      if (!this.form.firstName) {
        errors.name = ['Name is required'];
        valid = false;
      }
      if (!this.form.lastName) {
        errors.name = ['Last name is required'];
        valid = false;
      }
      if (!this.form.privacyPolicyAccepted) {
        errors.privacyPolicyAccepted = ['Agreeing to our policy is required'];
        valid = false;
      }
      this.errors = errors;
      return valid;
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/colors";
    @import "../../assets/sizes";
    @import "../../assets/media";
    @import "../../assets/fonts";

    .back-office {
        padding-top: 10vh;
    }

    .errors {
        color: red !important;
    }

    .participate__info {
        font-weight: bold;
        font-size: 1.5rem;
    }

    .participate__title {
        color: $brand;
        font-weight: bold;
        font-size: 2.5rem;
        line-height: 2.7rem;
    }

    .tshirtCut__label {
        padding-left: 0.75rem;
        font-size: 1rem;
    }

    .tshirtCut__select {
        display: flex;
    }

    .tshirtCut__selectItem {
        flex-basis: 50%;
    }

    .tshirtSize__label {

    }

    .participate__statisticsInfo {
        font-size: 1.2rem;
        line-height: 1.4rem;
    }


</style>
