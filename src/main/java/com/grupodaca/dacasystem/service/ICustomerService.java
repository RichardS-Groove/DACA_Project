package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.CustomerRequestDTO;
import com.grupodaca.dacasystem.dto.response.CustomerListResponseDTO;
import com.grupodaca.dacasystem.dto.response.CustomerResponseDTO;

import java.util.List;

public interface ICustomerService {

    Long addCustomer(CustomerRequestDTO customerRequestDTO);

    List<CustomerResponseDTO> customerList();

    void deleteCustomer(long id);

    long updateCustomer(long id, CustomerRequestDTO customerRequestDTO);
}
