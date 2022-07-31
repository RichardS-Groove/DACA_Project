package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.request.InvoiceRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerListResponseDTO;
import com.grupodaca.dacasystem.dto.response.InvoiceListResponseDTO;
import com.grupodaca.dacasystem.service.IInvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping("/api")
public class InvoiceController {

    @Autowired
    IInvoiceService invoiceService;

    @PostMapping("/invoice")
    public ResponseEntity<SuccessDTO> addInvoice(@RequestBody InvoiceRequestDTO dto){
        if(invoiceService.addInvoice(dto)!=null){
            return ResponseEntity.ok().body(new SuccessDTO("Factura agregada con éxito", 201));
        } else{
            throw new RuntimeException();
        }

    }
    @GetMapping("/invoice")
    public ResponseEntity<InvoiceListResponseDTO> findAllInvoice(){
        InvoiceListResponseDTO invoiceListResponseDTO = invoiceService.invoiceList();
        return ResponseEntity.ok().body(invoiceListResponseDTO);
    }
    @DeleteMapping("/invoice/{id}")
    public ResponseEntity<SuccessDTO> deleteInvoice(@PathVariable long id){
        invoiceService.deleteInvoice(id);
        return ResponseEntity.ok().body(new SuccessDTO("Factura eliminada con éxito", 201));
    }
    @PutMapping("/invoice/{id}")
    public ResponseEntity<SuccessDTO> updateInvoice(@RequestBody InvoiceRequestDTO dto,@PathVariable long id){
        invoiceService.updateInvoice(id,dto);
        return ResponseEntity.ok().body(new SuccessDTO("Factura modificada con éxito", 201));
    }
}
