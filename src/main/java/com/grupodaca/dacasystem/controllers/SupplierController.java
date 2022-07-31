package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.ProjectRequestDTO;
import com.grupodaca.dacasystem.dto.request.SupplierRequestDTO;
import com.grupodaca.dacasystem.dto.response.ProjectListResponseDTO;
import com.grupodaca.dacasystem.dto.response.SupplierListResponseDTO;
import com.grupodaca.dacasystem.dto.response.SupplierResponseDTO;
import com.grupodaca.dacasystem.service.ISupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@Transactional
@RequestMapping("/api")
public class SupplierController {

    @Autowired
    ISupplierService supplierService;

    @PostMapping("/supplier")
    public ResponseEntity<SuccessDTO> addSupplier(@RequestBody SupplierRequestDTO dto){
        if(supplierService.addSupplier(dto)!=null){
            return ResponseEntity.ok().body(new SuccessDTO("Proveedor agregado con éxito", 201));
        } else{
            throw new RuntimeException();
        }

    }
    @GetMapping("/supplier")
    public ResponseEntity<List<SupplierResponseDTO>> findAllSuppliers(){
        List<SupplierResponseDTO> supplierListResponseDTO =  supplierService.supplierList();
        return ResponseEntity.ok().body(supplierListResponseDTO);
    }
    @DeleteMapping("/supplier/{id}")
    public ResponseEntity<SuccessDTO> deleteSupplier(@PathVariable long id){
        supplierService.deleteSupplier(id);
        return ResponseEntity.ok().body(new SuccessDTO("Proveedor eliminado con éxito", 201));
    }
    @PutMapping("/supplier/{id}")
    public ResponseEntity<SuccessDTO> updateSupplier(@RequestBody SupplierRequestDTO dto, @PathVariable long id){
        supplierService.updateSupplier(id,dto);
        return ResponseEntity.ok().body(new SuccessDTO("Proveedor modificado con éxito", 201));
    }
}
