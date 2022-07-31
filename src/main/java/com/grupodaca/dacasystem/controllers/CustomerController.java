package com.grupodaca.dacasystem.controllers;

import com.grupodaca.dacasystem.dto.SuccessDTO;
import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.request.NoteRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerListResponseDTO;
import com.grupodaca.dacasystem.dto.response.CustomerResponseDTO;
import com.grupodaca.dacasystem.dto.response.NoteListResponseDTO;
import com.grupodaca.dacasystem.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@Transactional
@RequestMapping("/api")
public class CustomerController {

    @Autowired
    ICustomerService customerService;

    @PostMapping("/customer")
    public ResponseEntity<SuccessDTO> addCustomer(@RequestBody CustomerRequestDTO dto){
        if(customerService.addCustomer(dto)!=null){
            return ResponseEntity.ok().body(new SuccessDTO("Cliente agregado con éxito", 201));
        } else{
            throw new RuntimeException();
        }

    }
    @GetMapping("/customer")
    public ResponseEntity<List<CustomerResponseDTO>> findAllCustomers(){
        List<CustomerResponseDTO> customerListResponseDTO = customerService.customerList();
        return ResponseEntity.ok().body(customerListResponseDTO);
    }
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<SuccessDTO> deleteCustomer(@PathVariable long id){
        customerService.deleteCustomer(id);
        return ResponseEntity.ok().body(new SuccessDTO("Cliente eliminado con éxito", 201));
    }
    @PutMapping("/customer/{id}")
    public ResponseEntity<SuccessDTO> updateCustomer(@RequestBody CustomerRequestDTO dto,@PathVariable long id){
        customerService.updateCustomer(id,dto);
        return ResponseEntity.ok().body(new SuccessDTO("Cliente modificado con éxito", 201));
    }
}
