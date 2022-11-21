
export const getObjById = (id: string | number, objects: Array<any>) => {
    const result = objects.filter(obj => String(obj.id) === String(id));
    return result.length && result[0];
}

export const getObjNameById = (id: string | number, objects: Array<any>) => {
    const result = objects.filter(obj => String(obj.id) === String(id));
    return result.length && result[0].name;
}

export const truncateObject = (obj, idents: Array<string>): any => {
    const newObject = {};
    idents.forEach(ident => {
        newObject[ident] = obj[ident];
    });
    return newObject;
}

export const truncateArrayObjects = (arr: Array<any>, idents: Array<string>): Array<any> => {
    return arr.map(object => truncateObject(object, idents));
}
