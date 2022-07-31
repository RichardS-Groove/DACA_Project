package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.IncomingBillRequestDTO;
import com.grupodaca.dacasystem.dto.request.PurchaseOrderRequestDTO;
import com.grupodaca.dacasystem.dto.response.IncomingBillListResponseDTO;
import com.grupodaca.dacasystem.dto.response.PurchaseOrderListResponseDTO;

public interface IPurchaseOrderService {
    Long addPurchaseOrder(PurchaseOrderRequestDTO purchaseOrderDTO);

    PurchaseOrderListResponseDTO purchaseOrderList();

    void deletePurchaseOrder(long id);

    long updatePurchaseOrder(long id, PurchaseOrderRequestDTO purchaseOrderRequestDTO);
}
