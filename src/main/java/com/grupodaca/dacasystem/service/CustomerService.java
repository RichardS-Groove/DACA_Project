package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.response.*;
import com.grupodaca.dacasystem.entity.Customer;
import com.grupodaca.dacasystem.entity.Item;
import com.grupodaca.dacasystem.entity.Note;
import com.grupodaca.dacasystem.repository.CustumerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class CustomerService implements ICustomerService{

    @Autowired
    CustumerRepository custumerRepository;

    ModelMapper mapper = new ModelMapper();

    @Override
    public Long addCustomer(CustomerRequestDTO customerRequestDTO) {
        Customer customer = mapper.map(customerRequestDTO, Customer.class);

        customer = custumerRepository.save(
                customer
        );

        return customer.getId();
    }

    @Override
    public List<CustomerResponseDTO> customerList() {
        List<Customer> customerList = custumerRepository.findAll();
        List<CustomerResponseDTO> customerResponseDTOList = new ArrayList<>();
        customerResponseDTOList = customerList.stream().map(
                customer -> mapper.map(customer, CustomerResponseDTO.class)
        ).collect(Collectors.toList());

        return customerResponseDTOList;
    }

    @Override
    public void deleteCustomer(long id) {

        custumerRepository.deleteById(id);
    }

    @Override
    public long updateCustomer(long id, CustomerRequestDTO customerRequestDTO) {

        Customer customer = custumerRepository.findCustomerById(id);

        customer.setBusinessName(customerRequestDTO.getBusinessName());
        customer.setCuit(customerRequestDTO.getCuit());
        customer.setContactName(customerRequestDTO.getContactName());
        customer.setTelephone(customerRequestDTO.getTelephone());
        customer.setAddress(customerRequestDTO.getAddress());
        customer.setLocation(customerRequestDTO.getLocation());
        customer.setEmail(customerRequestDTO.getEmail());

        return customerRequestDTO.getId();
    }
}
