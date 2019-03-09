import { elements } from "./base";

export const cartToggle = () => elements.cart.style.getPropertyValue("--ty") === "0vh" 
                                    ? elements.cart.style.setProperty("--ty", "90vh")
                                    : elements.cart.style.setProperty("--ty", "0vh");