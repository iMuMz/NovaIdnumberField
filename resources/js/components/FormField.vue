<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">

<div class="flex flex-col">
  <div class="flex flex-row">

            <input
                :id="field.name"
                type="text"
                class="w-full form-control form-input form-input-bordered"
                :class="errorClasses"
                :placeholder="field.placeholder"
                :fullid="field.fullid"
                :storeComputedValues="field.storeComputedValues"
                :computedFieldName="field.computedFieldName"
                v-model="value"
            />

<span class="bg-blue hover:bg-blue-dark text-white .text-xs py-1 px-4 rounded-full">
  {{caluclateAge(value)}}{{age}}
</span>
<svg v-if="figureIsMale" style="width:32px;height:32px" viewBox="0 0 24 24">
    <path fill="#000000" d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,7H13.5A2,2 0 0,1 15.5,9V14.5H14V22H10V14.5H8.5V9A2,2 0 0,1 10.5,7Z" />
</svg>
<svg v-if="signIsMale" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#000000" d="M9,9C10.29,9 11.5,9.41 12.47,10.11L17.58,5H13V3H21V11H19V6.41L13.89,11.5C14.59,12.5 15,13.7 15,15A6,6 0 0,1 9,21A6,6 0 0,1 3,15A6,6 0 0,1 9,9M9,11A4,4 0 0,0 5,15A4,4 0 0,0 9,19A4,4 0 0,0 13,15A4,4 0 0,0 9,11Z" />
</svg>
<svg v-if="figureIsMale" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#000000" d="M12,2A2,2 0 0,1 14,4A2,2 0 0,1 12,6A2,2 0 0,1 10,4A2,2 0 0,1 12,2M10.5,22V16H7.5L10.09,8.41C10.34,7.59 11.1,7 12,7C12.9,7 13.66,7.59 13.91,8.41L16.5,16H13.5V22H10.5Z" />
</svg>
<svg v-if="signIsFemale" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#000000" d="M12,4A6,6 0 0,1 18,10C18,12.97 15.84,15.44 13,15.92V18H15V20H13V22H11V20H9V18H11V15.92C8.16,15.44 6,12.97 6,10A6,6 0 0,1 12,4M12,6A4,4 0 0,0 8,10A4,4 0 0,0 12,14A4,4 0 0,0 16,10A4,4 0 0,0 12,6Z" />
</svg>

<svg v-if="checkIsError" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#000000" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
</svg>
<svg v-if="checkIsOK" style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#000000" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
</svg>


  </div>
</div>


        </template>
    </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data: {
        age: '??',
        ageCalculated: false,
        placeholder: 'DOB Only (YYMMDD)',

        signIsMale: false,
        signIsFemale: false,

        figureIsMale: false,
        figureIsFemale: false,

        checkIsOK: false,
        checkIsError: false,



    },
    methods: {

        caluclateAge(value) {
            console.log('Calc called with value :', value);
            this.age = '??';
            if (value) {
                if (value.length >= 6) {
                    var datepart = value.substr(0,6);
                    var yearpart = value.substr(0,2);
                    var nowY = moment().year();
                    var nowYStr = nowY.toString();
                    var nowCC = nowYStr.substr(0,2);
                    var nowYY = nowYStr.substr(2,2);
                    var iDateYY = parseInt(yearpart);
                    var iNowYY = parseInt(nowYY);
                    var iNowCC = parseInt(nowCC);
                    var guessCC = (iNowCC -1);
                    console.log('Now year is',nowCC);
                    console.log('Now year is',nowYStr);
                    console.log('Now century is',nowCC);
                    console.log('DateYY',iDateYY);
                    console.log('NowCC',iNowCC);
                    if (iDateYY <= parseInt(iNowYY))
                    {
                        guessCC = iNowCC;
                    }
                    console.log('Guess centurty is',guessCC);

                    var dob = moment(guessCC.toString() + datepart,'YYYYMMDD').toDate();
                    if (dob > moment().toDate()) {
                        console.log('Woops we guessed a future DOB! Lets reverse 1');
                        guessCC = guessCC - 1;
                        dob = moment(guessCC.toString() + datepart,'YYYYMMDD').toDate();
                    }
                    console.log('DOB is',dob);
                    var agey = moment().diff(dob,'years', false);
                    if (isNaN(agey)) {
                        this.age = '??'
                    } else {
                        this.age=agey;
                    }
                    

                }

            }
            
        },
        /*
         * Set the initial, internal value for the field.
         */
        setInitialValue() {
            this.value = this.field.value || ''
        },

        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(this.field.attribute, this.value || '')
        },

        /**
         * Update the field's internal value.
         */
        handleChange(value) {
            console.log('Changed');
            this.value = value
        },
    },
}
</script>
