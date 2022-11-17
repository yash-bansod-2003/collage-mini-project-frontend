import jsonwebtoken from 'jsonwebtoken';

export class jwtService {
    static sign(
        payload,
        secret = process.env.JWT_SECRET || 'ghuxhcioffihfifahfifhshfdoffaof',
        expiry = '1h'
    ) {
        return jsonwebtoken.sign(payload, secret, { expiresIn: expiry });
    }
}
