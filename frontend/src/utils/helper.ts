export const validateEmail = (email : string) : boolean => {
    // https://dirask.com/posts/TypeScript-validate-email-with-regex-Dn40Ej
    // Email RegExp taken from: https://github.com/angular/angular.js/blob/65f800e19ec669ab7d5abbd2f6b82bf60110651a/src/ng/directive/input.js
    const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    const result: boolean = expression.test(email); // true
    return result 
};

export const format_date = (datetime : string) : string => {
    const date : string[] = datetime.split("T");
    return date[0] || "No Date"; 
}