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
            <div class="back-office">
                <h4 class="participate__info">All fields required</h4>
                <h2 class="participate__title">Personal information</h2>
                <div class="row">
                    <form @submit="save" class="col s12" novalidate>
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="" id="first_name" required
                                       type="text" v-model="form.firstName">
                                <label for="first_name">first name</label>
                                <span class="errors helper-text" v-for="error in errors.name">{{error}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="" id="last_name" required
                                       type="text" v-model="form.lastName">
                                <label for="last_name">last name</label>
                                <span class="errors helper-text" v-for="error in errors.name">{{error}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email" required
                                       type="email" v-model="form.email">
                                <label for="email">e-mail address</label>
                                <span class="errors helper-text" v-for="error in errors.email">{{error}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <label class="tshirtCut__label">t-shirt cut</label>
                            <div class="input-field col s12">
                                <div class="tshirtCut__select">
                                    <label class="tshirtCut__selectItem">
                                        <input
                                                name="t-shirt-cut" type="radio" value="m" v-model="form.gender"/>
                                        <span>Male</span>
                                    </label>
                                    <label class="tshirtCut__selectItem">
                                        <input class="tshirtCut__selectItem"
                                               name="t-shirt-cut" type="radio" value="f" v-model="form.gender"/>
                                        <span>female</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <select v-model="form.size">
                                    <option disabled selected value=""></option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                                <label>T-shirt size</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s12">
                                <label>
                                    <input id="privacyPolicyAccepted" required
                                           type="checkbox" v-model="form.privacyPolicyAccepted">
                                    <span>I accept the <router-link
                                            to="privacy-policy">privacy policy</router-link></span>
                                </label>
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

                            <div class="input-field col s12">
                                <select id="mealOption" name="mealOption">
                                    <option disabled selected value="">select</option>
                                    <option value="meat">Meat</option>
                                    <option value="vegetarian">Vegetarian</option>
                                </select>
                                <label>meal option</label>

                                <!--                            <div class="helper-text">-->
                                <!--                                We can't promise that you will be able to get option that you have selected. The food at-->
                                <!--                                configtura will not be portioned, so first come - first served.-->
                                <!--                            </div>-->
                                <!--<mat-error *ngIf="mealOption?.hasError('required')">
                                    This field is required
                                </mat-error>-->
                            </div>
                        </div>
                        <div class="row">

                            <div class="input-field col s12">
                                <input class="" id="city" required
                                       maxlength="255" name="city"
                                       type="text" v-model="form.city">
                                <label for="city">city</label>
                                <!--  <mat-error *ngIf="city?.hasError('required')">
                                      This field is required
                                  </mat-error>-->
                            </div>
                        </div>
                        <div class="row">

                            <div class="input-field col s12">
                                <select id="experience" name="experience"
                                        required>
                                    <option disabled selected value=""></option>
                                    <option value="I am just learning">I am just learning</option>
                                    <option value="Less than a year">Less than a year</option>
                                    <option value="1-2 years">1-2 years</option>
                                    <option value="2-4 years">2-4 years</option>
                                    <option value="4-8 years">4-8 years</option>
                                    <option value="Over 8 years">Over 8 years</option>
                                </select>
                                <label>experience</label>

                                <!-- <mat-error *ngIf="experience?.hasError('required')">
                                     This field is required
                                 </mat-error>-->
                            </div>
                        </div>
                        <div class="row">

                            <div class="input-field col s12">
                                <select id="role" name="role" placeholder="your role" required>
                                    <option disabled selected value=""></option>

                                    <option value="student">Student</option>
                                    <option value="Developer">Developer</option>
                                    <option value="Team Leader">Team Leader</option>
                                    <option value="Project Leader">Project Leader</option>
                                    <option value="Architect">Architect</option>
                                    <option value="Tester">Tester</option>
                                    <option value="Other">Other</option>
                                </select>
                                <label>your role</label>

                                <!-- <mat-error *ngIf="role?.hasError('required')">
                                     This field is required
                                 </mat-error>-->
                            </div>
                        </div>
                        <div class="row">

                        <span v-for="error in errors.form">
                             {{error}} <br/>
                        </span>
                        </div>
                        <div class="row">

                            <div>
                                <button class="btn waves-effect waves-light button button--save" name="action"
                                        type="submit">Save
                                </button>
                            </div>
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
  import M from 'materialize-css';
  import axios from 'axios';
  import PageHeader from '@/components/PageHeader.vue';
  import { Participant, RegistrationForm } from '@/types';
  import { validEmail } from '@/validation-utils';

  @Component({
    components: { PageHeader, Box, TheContact },
  })
  export default class ParticipatePage extends Vue {
    public form: RegistrationForm = { voucher: { id: 'abc' } };
    public errors: any = {};

    public mounted() {
      M.AutoInit();
      const { voucher } = this.$route.query;
      axios.get(`/api/vouchers/${voucher}/check`).then((value) => {
        this.form = { voucher: { id: voucher as string } };
        setTimeout(() => {
          M.updateTextFields();
          M.FormSelect.init(document.querySelectorAll('select'));
        });
      }, (reason) => {
        this.errors = { voucher: [reason.response.data] };
      });
    }

    public updated() {
      M.updateTextFields();
    }

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
