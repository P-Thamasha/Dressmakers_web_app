{
  "type": "drawio",
  "version": "17.4.0",
  "diagram": [
    {
      "id": "AI-Dressmaking-ER",
      "name": "ER Diagram",
      "objects": [
        {
          "id": "Customer",
          "type": "entity",
          "x": 100,
          "y": 80,
          "width": 160,
          "height": 80,
          "label": "Customer\n\nPK: CustomerID\nName\nEmail\nPhone\nMeasurements"
        },
        {
          "id": "Chatbot",
          "type": "entity",
          "x": 400,
          "y": 80,
          "width": 180,
          "height": 80,
          "label": "Chatbot_Interaction\n\nPK: ChatID\nFK: CustomerID\nMessage\nResponse\nTimestamp"
        },
        {
          "id": "Order",
          "type": "entity",
          "x": 100,
          "y": 240,
          "width": 160,
          "height": 80,
          "label": "Order\n\nPK: OrderID\nFK: CustomerID, DressID\nStatus\nDate\nPrice"
        },
        {
          "id": "Dress",
          "type": "entity",
          "x": 400,
          "y": 240,
          "width": 160,
          "height": 80,
          "label": "Dress\n\nPK: DressID\nName\nStyle\nPrice"
        },
        {
          "id": "Payment",
          "type": "entity",
          "x": 700,
          "y": 240,
          "width": 160,
          "height": 80,
          "label": "Payment\n\nPK: PaymentID\nFK: OrderID\nAmount\nMethod\nStatus"
        },
        {
          "id": "Inventory",
          "type": "entity",
          "x": 100,
          "y": 400,
          "width": 180,
          "height": 80,
          "label": "Inventory\n\nPK: FabricID\nType\nQuantity\nSupplier"
        },
        {
          "id": "AIReports",
          "type": "entity",
          "x": 400,
          "y": 400,
          "width": 180,
          "height": 80,
          "label": "AI_Reports\n\nPK: ReportID\nReportType\nGeneratedDate\nPredictedData"
        },
        {
          "id": "OrderFabric",
          "type": "entity",
          "x": 700,
          "y": 400,
          "width": 180,
          "height": 80,
          "label": "Order_Fabric\n\nPK: OF_ID\nFK: OrderID, FabricID\nQuantityUsed"
        },
        {
          "id": "Rel1",
          "type": "edge",
          "source": "Customer",
          "target": "Order",
          "label": "1 ──< Places"
        },
        {
          "id": "Rel2",
          "type": "edge",
          "source": "Order",
          "target": "Dress",
          "label": "M ──> 1"
        },
        {
          "id": "Rel3",
          "type": "edge",
          "source": "Order",
          "target": "Payment",
          "label": "1 ── 1"
        },
        {
          "id": "Rel4",
          "type": "edge",
          "source": "Customer",
          "target": "Chatbot",
          "label": "1 ──< Chats"
        },
        {
          "id": "Rel5",
          "type": "edge",
          "source": "Order",
          "target": "OrderFabric",
          "label": "1 ──< Uses"
        },
        {
          "id": "Rel6",
          "type": "edge",
          "source": "Inventory",
          "target": "OrderFabric",
          "label": "1 ──< Used In"
        },
        {
          "id": "Rel7",
          "type": "edge",
          "source": "Order",
          "target": "AIReports",
          "label": "Data Source"
        },
        {
          "id": "Rel8",
          "type": "edge",
          "source": "Dress",
          "target": "AIReports",
          "label": "Data Source"
        }
      ]
    }
  ]
}
