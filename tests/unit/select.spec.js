import {shallowMount, mount} from "@vue/test-utils";
import countries from "@/assets/countries";
import Select from "@/components/Select.vue";

describe("Select.vue", () => {
    it("Default message is 'Select some other country'", () => {
        const wrapper = mount(Select, {
            propsData: {
                placeholder: "Select some other country",
                data: countries,
            },
        });
        const defaultMessage = wrapper.find("span");
        const icon = wrapper.find("svg");
        expect(defaultMessage.text()).toMatch("Select some other country");
        expect(icon.text()).toMatch("Show");
    });

    it("Given default", () => {
        const wrapper = mount(Select, {
            propsData: {
                placeholder: "Select some other country",
                data: countries,
                default: {
                    name: "Default Name",
                },
            },
        });
        const defaultMessage = wrapper.find("span");
        const icon = wrapper.find("svg");
        expect(defaultMessage.text()).toMatch("Default Name");
        expect(icon.text()).toMatch("Show");
    });

    it("Testing user selection", async () => {
        const wrapper = shallowMount(Select, {
            propsData: {
                placeholder: "Select some other country",
                data: countries,
            },
            data() {
                return {
                    showList: true,
                };
            },
        });

        const country = wrapper.find("span");
        const icon = wrapper.find("svg");

        const afghanistan = wrapper.find(".select--list--item:nth-of-type(1)");
        const australia = wrapper.find(".select--list--item:nth-of-type(13)");

        expect(icon.text()).toMatch("Hide");

        await afghanistan.trigger("click");
        expect(country.text()).toMatch("Afghanistan");

        await australia.trigger("click");
        expect(country.text()).toMatch("Australia");
    });
});
