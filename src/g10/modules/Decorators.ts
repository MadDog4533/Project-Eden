export function override(): Function{
    return function(target: any, propertyKey: string, descriptor: any){
        console.log(descriptor);
    }
}

export function instanceable(constructorFunction: Function) {
    constructorFunction.prototype.instanceable = true;
}