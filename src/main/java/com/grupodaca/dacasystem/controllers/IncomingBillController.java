package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.request.IncomingBillRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerListResponseDTO;
import com.grupodaca.dacasystem.dto.response.IncomingBillListResponseDTO;
import com.grupodaca.dacasystem.entity.IncomingBill;
import com.grupodaca.dacasystem.service.IIncomingBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;

@RestController
@Transactional
@RequestMapping("/api")
public class IncomingBillController {
    @Autowired
    IIncomingBillService incomingBillService;

    @PostMapping("/incomingbill")
    public ResponseEntity<SuccessDTO> addIncomingBill(@RequestBody IncomingBillRequestDTO dto){
        if(incomingBillService.addIncomingBill(dto)!=null){
            return ResponseEntity.ok().body(new SuccessDTO("Factura agregada con éxito", 201));
        } else{
            throw new RuntimeException();
        }

    }
    @GetMapping("/incomingbill")
    public ResponseEntity<IncomingBillListResponseDTO> findAllIncomingBill(){
        IncomingBillListResponseDTO incomingBillListResponseDTO = incomingBillService.incomingBillList();
        return ResponseEntity.ok().body(incomingBillListResponseDTO);
    }
    @DeleteMapping("/incomingbill/{id}")
    public ResponseEntity<SuccessDTO> deleteIncomingBill(@PathVariable long id){
        incomingBillService.deleteIncomingBill(id);
        return ResponseEntity.ok().body(new SuccessDTO("Factura eliminada con éxito", 201));
    }
    @PutMapping("/incomingbill/{id}")
    public ResponseEntity<SuccessDTO> updateIncomingBill(@RequestBody IncomingBillRequestDTO dto,@PathVariable long id){
        incomingBillService.updateIncomingBill(id,dto);
        return ResponseEntity.ok().body(new SuccessDTO("Factura modificada con éxito", 201));
    }
}
