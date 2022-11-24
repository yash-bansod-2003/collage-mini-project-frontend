import jsonwebtoken from 'jsonwebtoken';

export class jwtService {
    static sign(
        payload,
        secret = process.env.JWT_SECRET || 'kcF9o8RIevMyg74IU0pvcTxkfqefolBh',
        expiry = '1h'
    ) {
        return jsonwebtoken.sign(payload, secret, { expiresIn: expiry });
    }
}


export const selectionMaker = (array) => {
    const newArr = [];
    array.forEach(element => {
        newArr.push({ key: `${element.name}`, value: `${element._id}` })
    });
    return newArr;
}