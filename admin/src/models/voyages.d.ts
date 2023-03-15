type CreateVoyageType = {
  portId: number
  invoiceId: string
}

type VoyageType = {
  id: number
  port_id: number
  port: PortType
  invoice_id: string
  invoice: InvoiceType
  created_at: string
  delivered: boolean
}
