package com.grupodaca.dacasystem.service;

import com.grupodaca.dacasystem.dto.request.SupplierRequestDTO;
import com.grupodaca.dacasystem.dto.response.SupplierResponseDTO;
import com.grupodaca.dacasystem.entity.Supplier;
import com.grupodaca.dacasystem.repository.SupplierRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierService implements ISupplierService {

    @Autowired
    SupplierRepository supplierRepository;

    ModelMapper mapper = new ModelMapper();

    @Override
    public Long addSupplier(SupplierRequestDTO supplierRequestDTO) {

        Supplier supplier = mapper.map(supplierRequestDTO, Supplier.class);

        supplier = supplierRepository.save(supplier);

        return supplier.getId();
    }

    @Override
    public List<SupplierResponseDTO> supplierList() {
        List<Supplier> supplierList = supplierRepository.findAll();
        List<SupplierResponseDTO> supplierResponseDTOList = new ArrayList<>();
        supplierResponseDTOList = supplierList.stream().map(
                supplier -> mapper.map(supplier, SupplierResponseDTO.class)
        ).collect(Collectors.toList());


        return supplierResponseDTOList;
    }

    @Override
    public void deleteSupplier(long id) {
        supplierRepository.deleteById(id);
    }

    @Override
    public long updateSupplier(long id, SupplierRequestDTO supplierRequestDTO) {

        Supplier supplier = supplierRepository.findSupplierById(id);

        supplier.setBusinessName(supplierRequestDTO.getBusinessName());
        supplier.setCuit(supplierRequestDTO.getCuit());
        supplier.setContactName(supplierRequestDTO.getContactName());
        supplier.setTelephone(supplierRequestDTO.getTelephone());
        supplier.setAddress(supplierRequestDTO.getAddress());
        supplier.setLocation(supplierRequestDTO.getLocation());
        supplier.setEmail(supplierRequestDTO.getEmail());

        return supplierRequestDTO.getId();
    }
}
