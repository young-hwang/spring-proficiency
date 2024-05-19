package me.catalogservice.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import me.catalogservice.entity.CatalogEntity;
import me.catalogservice.jpa.CatalogRepository;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class CatalogServiceImpl implements CatalogService {

    private final CatalogRepository catalogRepository;

    @Override
    public Iterable<CatalogEntity> getAllCatalogs() {
       return catalogRepository.findAll();
    }

    @Override
    public CatalogEntity getCatalog(String productId) {
        return null;
    }

    @Override
    public Iterable<CatalogEntity> getCatalogsByCategory(String category) {
        return null;
    }

    @Override
    public CatalogEntity createCatalog(CatalogEntity catalog) {
        return null;
    }

    @Override
    public CatalogEntity updateCatalog(String productId, CatalogEntity catalog) {
        return null;
    }

    @Override
    public void deleteCatalog(String productId) {

    }
}
