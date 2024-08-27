export class Service {
    constructor(
        clientID,
        attendantID,
        price,
        serviceType,
        patmentType,
        description
    ) {
        this.client.id = clientID
        this.attendant.id = attendantID
        this.price = price
        this.serviceType = serviceType
        this.patmentType = patmentType
        this.description = description
    }
}
