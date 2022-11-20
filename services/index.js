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
