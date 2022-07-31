package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.NoteRequestDTO;
import com.grupodaca.dacasystem.dto.request.PurchaseOrderRequestDTO;
import com.grupodaca.dacasystem.dto.response.NoteListResponseDTO;
import com.grupodaca.dacasystem.dto.response.PurchaseOrderListResponseDTO;
import com.grupodaca.dacasystem.dto.response.PurchaseOrderResponseDTO;
import com.grupodaca.dacasystem.service.INoteService;
import com.grupodaca.dacasystem.service.IPurchaseOrderService;
import com.grupodaca.dacasystem.service.NotePDFService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@Transactional
@RequestMapping("/api")
public class PurchaseOrderController {
    @Autowired
    IPurchaseOrderService purchaseOrderService;


    @PostMapping("/purchaseOrder")
    public ResponseEntity<SuccessDTO> addPurchaseOrder(@RequestBody PurchaseOrderRequestDTO dto){
        if(purchaseOrderService.addPurchaseOrder(dto)!=null){
            return ResponseEntity.ok().body(new SuccessDTO("OC agregada con éxito", 201));
        } else{
            throw new RuntimeException();
        }

    }
    @GetMapping("/purchaseOrder")
    public ResponseEntity<PurchaseOrderListResponseDTO> findAllPurchaseOrder(){
        PurchaseOrderListResponseDTO purchaseOrderListResponseDTO = purchaseOrderService.purchaseOrderList();
        return ResponseEntity.ok().body(purchaseOrderListResponseDTO);
    }
    @DeleteMapping("/purchaseOrder/{id}")
    public ResponseEntity<SuccessDTO> deletePurchaseOrder(@PathVariable long id){
        purchaseOrderService.deletePurchaseOrder(id);
        return ResponseEntity.ok().body(new SuccessDTO("OC eliminada con éxito", 201));
    }
    @PutMapping("/purchaseOrder/{id}")
    public ResponseEntity<SuccessDTO> updatePurchaseOrder(@RequestBody PurchaseOrderRequestDTO dto,@PathVariable long id){
        purchaseOrderService.updatePurchaseOrder(id,dto);
        return ResponseEntity.ok().body(new SuccessDTO("OC modificada con éxito", 201));
    }

}
