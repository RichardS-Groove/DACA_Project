package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.IncomingBillRequestDTO;
import com.grupodaca.dacasystem.dto.request.PurchaseOrderRequestDTO;
import com.grupodaca.dacasystem.dto.response.IncomingBillListResponseDTO;
import com.grupodaca.dacasystem.dto.response.PurchaseOrderListResponseDTO;
import com.grupodaca.dacasystem.dto.response.PurchaseOrderResponseDTO;
import com.grupodaca.dacasystem.entity.PurchaseOrder;
import com.grupodaca.dacasystem.repository.PurchaseOrderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class PurchaseOrderService implements IPurchaseOrderService{

    @Autowired
    PurchaseOrderRepository purchaseOrderRepository;

    ModelMapper mapper = new ModelMapper();

    @Override
    public Long addPurchaseOrder(PurchaseOrderRequestDTO purchaseOrderDTO) {
        PurchaseOrder purchaseOrder = mapper.map(purchaseOrderDTO,PurchaseOrder.class);

        purchaseOrder.setItemsList(purchaseOrderDTO.getItemsList());

        purchaseOrder = purchaseOrderRepository.save(purchaseOrder);

        return purchaseOrder.getId();
    }

    @Override
    public PurchaseOrderListResponseDTO purchaseOrderList() {
        List<PurchaseOrder> purchaseOrders = purchaseOrderRepository.findAll();

        return new PurchaseOrderListResponseDTO(purchaseOrders.stream().map(
                purchaseOrder -> mapper.map(purchaseOrder, PurchaseOrderResponseDTO.class)
        ).collect(Collectors.toList()));
    }

    @Override
    public void deletePurchaseOrder(long id) {
        purchaseOrderRepository.deleteById(id);
    }
    @Override
    public long updatePurchaseOrder(long id, PurchaseOrderRequestDTO purchaseOrderRequestDTO) {
        PurchaseOrder purchaseOrder = purchaseOrderRepository.findById(id).get();

        purchaseOrder.setDateOfIssue(purchaseOrderRequestDTO.getDateOfIssue());
        purchaseOrder.setType(purchaseOrderRequestDTO.getType());
        purchaseOrder.setSupplier(purchaseOrderRequestDTO.getSupplier());
        purchaseOrder.setSaleCondition(purchaseOrderRequestDTO.getSaleCondition());
        purchaseOrder.setPaymentDate(purchaseOrderRequestDTO.getPaymentDate());
        purchaseOrder.setPaymentMethod(purchaseOrderRequestDTO.getPaymentMethod());
        purchaseOrder.setStatus(purchaseOrderRequestDTO.getStatus());
        purchaseOrder.setItemsList(purchaseOrderRequestDTO.getItemsList());
        purchaseOrder.setDateOfDelivery(purchaseOrderRequestDTO.getDateOfDelivery());
        purchaseOrder.setProject(purchaseOrderRequestDTO.getProject());

        return purchaseOrderRequestDTO.getId();
    }
}
